class CompositeBinder{
  constructor(binders){
    this.binders = binders;
  }

  add(binder){
    this.binders.push(binder);
  }

  bind(){
    this.binders.forEach(binder => binder.bind());

    return this;
  }

  unbind(){
    this.binders.forEach(binder => binder.unbind());

    return this;
  }

  syncView(){
    this.binders
      .filter(binder => binder.render && typeof binder.render == 'object')
      .forEach(binder => binder.render.sync());

    return this;
  }

  syncModel(){
    this.binders
      .filter(binder => binder.handler && typeof binder.handler == 'object')
      .forEach(binder => binder.handler.sync());

    return this;
  }
};

module.exports = CompositeBinder;
