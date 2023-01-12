export const validationRules = {
  required: value => !!value || 'Erforderlich',
  counter: value => !value || value.length <= 200 || 'Max. 200 Zeichen',
  positiveNumber: value => (value > 0) || 'Keine gültige Personenanzahl'
}
