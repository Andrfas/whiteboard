module.exports = {

  attributes: {
    title: {
      type:'string'
    },
    test2: {
      collection: 'Test2',
      via: 'owner'
    }
  }
};
