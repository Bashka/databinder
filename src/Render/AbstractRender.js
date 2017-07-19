class AbstractRender{
  constructor(model, prop, $el){
    this.model = model;
    this.prop = prop;
    this.$el = $el;
  }

  bind(){
    this.model.on('change:' + this.prop, this.sync.bind(this));

    return this;
  }

  unbind(){
    this.model.off('change:' + this.prop, this.sync.bind(this));

    return this;
  }

  prepare(value){
    return value;
  }

  sync(){
    let value = this.model.get(this.prop);
    value = this.prepare(value);
    this.render(value);

    return this;
  }

  render(value){
  }
};

module.exports = AbstractRender;
