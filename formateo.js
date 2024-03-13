
function reformatJson(originalJson) {
    const result = {};
  
    for (const category in originalJson.variables) {
      for (const subcategory in originalJson.variables[category]) {
        for (const item in originalJson.variables[category][subcategory]) {
          const propValues = originalJson.variables[category][subcategory][item];
  
          if (propValues.border && propValues.border.color && propValues.border.color.value) {
            // Agrupar bajo 'color'
            result.color = result.color || {};
            result.color[category] = result.color[category] || {};
            result.color[category][subcategory] = result.color[category][subcategory] || {};
            result.color[category][subcategory][item] = {
              border: {
                color: {
                  value: propValues.border.color.value
                }
              }
            };
          } else if (propValues.type && propValues.value) {
            // Agrupar bajo 'size'
            result.size = result.size || {};
            result.size[category] = result.size[category] || {};
            result.size[category][subcategory] = result.size[category][subcategory] || {};
            result.size[category][subcategory][item] = {
              value: propValues.value
            };
          }
        }
      }
    }
  
    return result;
  }
  
  // Ejemplo de uso
  const originalJson ={
    "variables": {
      "button": {
        "primary": {
          "normal": {
            "border": {
              "color": {
                "type": "color",
                "value": "{surface.surface.transparent}",
                "extensions": {
                  "org.lukasoppermann.figmaDesignTokens": {
                    "mode": "Primary",
                    "collection": "button",
                    "scopes": ["ALL_SCOPES"],
                    "variableId": "VariableID:1901:11102",
                    "exportKey": "variables"
                  }
                }
              }
            }
          }
        }
      }
  }
  };

  const ejemplo = originalJson.variables.button.primary.normal.border.color.value;
  const valueSplitted = ejemplo.split("{")
  const valueConcatenated = "{color."+valueSplitted[1];

  const formattedJson = reformatJson(originalJson);
  formattedJson.color.button.primary.normal.border.color.value = valueConcatenated
  
  console.log(JSON.stringify(formattedJson, null, 2));
  console.log(valueConcatenated);
  