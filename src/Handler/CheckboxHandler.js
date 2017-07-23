const AbstractHandler = require('./AbstractHandler');

class CheckboxHandler extends AbstractHandler{
  constructor(model, prop, $el, event = 'change'){
    super(model, prop, $el, event);
  }

  handle(event){
    if(this.$el.length == 1){
      return this.$el.prop('checked')? this.$el.val() : null;
    }
    else{
      let val = [];
      this.$el.filter(':checked').each(function(){
        val.push($(this).val());
      });
      return val;
    }
  }
};

module.exports = CheckboxHandler;
