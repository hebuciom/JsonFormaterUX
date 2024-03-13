const fs = require('fs');

function reformatJson(originalJson) {
  return Object.keys(originalJson.variables).map(category => {
    return Object.keys(originalJson.variables[category]).map(subcategory => {
      return Object.keys(originalJson.variables[category][subcategory]).map(item => {
        const propValues = originalJson.variables[category][subcategory][item];
        if (propValues.border && propValues.border.color && propValues.border.color.value) {
          return {
            color: {
              [category]: {
                [subcategory]: {
                  [item]: {
                    border: {
                      color: {
                        value: propValues.border.color.value
                      }
                    }
                  }
                }
              }
            }
          };
        } else if (propValues.type && propValues.value) {
          return {
            size: {
              [category]: {
                [subcategory]: {
                  [item]: {
                    value: propValues.value
                  }
                }
              }
            }
          };
        }
        return null; // Retorna null para ítems que no cumplen con las condiciones
      });
    });
  }).flat(3).reduce((acc, val) => (val ? Object.assign(acc, val) : acc), {});
}

// Ruta al archivo JSON de entrada
const inputFilePath = '/Users/hebuciom/Documents/formateoJson/archivo_entrada.json';

// Ruta al archivo JSON de salida
const outputFilePath = '/Users/hebuciom/Documents/formateoJson/archivo_salida.json';

// Lectura del archivo JSON de entrada
fs.readFile(inputFilePath, 'utf8', (err, data) => {
  if (err) {
    console.error('Error al leer el archivo de entrada:', err);
    return;
  }

  try {
    // Parsear el contenido del archivo de entrada a objeto JSON
    const originalJson = JSON.parse(data);

    // Llamar a la función con el JSON original
    const formattedJson = reformatJson(originalJson);
    const valueJson = formattedJson.color.button.primary.normal.border.color.value;
    const valueSplitted = valueJson.split("{")
    const valueConcatenated = "{color."+valueSplitted[1];
    formattedJson.color.button.primary.normal.border.color.value = valueConcatenated

    // Escribir el JSON formateado en un nuevo archivo
    fs.writeFile(outputFilePath, JSON.stringify(formattedJson, null, 2), 'utf8', (writeErr) => {
      if (writeErr) {
        console.error('Error al escribir el archivo de salida:', writeErr);
      } else {
        console.log('El archivo de salida ha sido generado con éxito:', outputFilePath);
      }
    });
  } catch (parseError) {
    console.error('Error al analizar el contenido del archivo JSON de entrada:', parseError);
  }
});
