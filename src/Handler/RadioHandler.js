const AbstractHandler = require('./AbstractHandler');

class RadioHandler extends AbstractHandler{
  constructor(model, prop, $el, event = 'change'){
    super(model, prop, $el, event);
  }

  handle(event){
    const $checked = this.$el.filter(':checked');
    return $checked.length? $checked.val() : null;
  }
};

module.exports = RadioHandler;
