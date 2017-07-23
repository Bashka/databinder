module.exports = {
  Handler: {
    CallbackHandler: require('./Handler/CallbackHandler'),
    ValueHandler: require('./Handler/ValueHandler'),
    RadioHandler: require('./Handler/RadioHandler'),
    CheckboxHandler: require('./Handler/CheckboxHandler'),
    TextHandler: require('./Handler/TextHandler'),
    SelectHandler: require('./Handler/SelectHandler')
  },
  Render: {
    CallbackRender: require('./Render/CallbackRender'),
    AttributeRender: require('./Render/AttributeRender'),
    ValueRender: require('./Render/ValueRender'),
    HtmlRender: require('./Render/HtmlRender'),
    RadioRender: require('./Render/RadioRender'),
    CheckboxRender: require('./Render/CheckboxRender'),
    TextRender: require('./Render/TextRender'),
    SelectRender: require('./Render/SelectRender')
  },
  BinderFactory: require('./BinderFactory'),
  CompositeBinder: require('./CompositeBinder'),
  CallbackBinder: require('./CallbackBinder'),
  AttributeBinder: require('./AttributeBinder'),
  ValueBinder: require('./ValueBinder'),
  HtmlBinder: require('./HtmlBinder'),
  RadioBinder: require('./RadioBinder'),
  CheckboxBinder: require('./CheckboxBinder'),
  TextBinder: require('./TextBinder'),
  SelectBinder: require('./SelectBinder')
};
