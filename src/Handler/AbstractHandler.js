class AbstractHandler{
  constructor(model, prop, $el, event){
    this.model = model;
    this.prop = prop;
    this.$el = $el;
    this.event = event;
  }

  bind(){
    this.$el.on(this.event, this.sync.bind(this));

    return this;
  }

  unbind(){
    this.$el.off(this.event, this.sync.bind(this));

    return this;
  }

  prepare(value){
    return value;
  }

  sync(event){
    let value = this.handle(event);
    value = this.prepare(value);

    this.model.set(this.prop, value);

    return this;
  }

  handle(event){
  }
};

module.exports = AbstractHandler;
