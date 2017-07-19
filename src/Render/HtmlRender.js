const AbstractRender = require('./AbstractRender');

class HtmlRender extends AbstractRender{
  render(value){
    this.$el.html(value);
  }
};

module.exports = HtmlRender;
