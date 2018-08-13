const { createStore } = require('redux');
const TrelloApp = require('.');
const should = require('chai').should();

describe('TrelloApp', function() {
  
    const currState = {
        currentBoard: {
          id: 'b1',
          name: 'MyBoard',
          lists: [{
            id: '111',
            name: 'Some List Name',
            cards: [{
              id: 'abc',
              text: 'def'
            }, {
              id: 'abc1',
              text: 'def1'
            }]
          }, {
            id: '112',
            name: 'Some List Name 1',
            cards: []
          }]
        }
      };

  const store = createStore(TrelloApp, currState);

  it('should ADD_CARD', function() {
    const action = {
      type: 'ADD_CARD',
      payload: {
        listId: '111',
        text: 'ghi'
      }
    };

    
    store.dispatch(action);

    store.getState().should.have.property('currentBoard');
    store.getState().currentBoard.should.have.property('lists').and.be.an('array').of.length(2);
    store.getState().currentBoard.lists[0].should.have.property('cards').and.be.an('array').of.length(3);
    store.getState().currentBoard.lists[0].cards[2].should.have.property('id');
    store.getState().currentBoard.lists[0].cards[2].should.have.property('text').and.equal('ghi');
  });

  it('should EDIT_CARD', function () {

    const action = {
      type: 'EDIT_CARD',
      payload: {
        listId: '111',
        cardId: 'abc',
        text: 'hello'
      }
    };
    store.dispatch(action);

    store.getState().should.have.property('currentBoard');
    store.getState().currentBoard.should.have.property('lists').and.be.an('array').of.length(2);
    store.getState().currentBoard.lists[0].should.have.property('cards').and.be.an('array').of.length(3);
    store.getState().currentBoard.lists[0].cards[0].should.have.property('id');
    store.getState().currentBoard.lists[0].cards[0].should.have.property('text').and.equal('hello');
  });

  it('should EDIT_LIST', function () {

    const action = {
      type: 'EDIT_LIST',
      payload: {
        listId: '111',
        name: "welcome"
      }
    };
    store.dispatch(action);

    store.getState().should.have.property('currentBoard');
    store.getState().currentBoard.should.have.property('lists').and.be.an('array').of.length(2);
    store.getState().currentBoard.lists[0].should.have.property('cards').and.be.an('array').of.length(3);
    store.getState().currentBoard.lists[0].should.have.property('id');
    store.getState().currentBoard.lists[0].should.have.property('name').and.equal('welcome');

  });

  it('should CREATE_LIST', function() {

     const action = {
       type: 'CREATE_LIST',
       payload: {
         boardId: 'b1',
         name: "newlist"
       }
     };
     store.dispatch(action);

     store.getState().should.have.property('currentBoard');
     store.getState().currentBoard.should.have.property('lists').and.be.an('array').of.length(3);
     store.getState().currentBoard.lists[2].should.have.property('id');
     store.getState().currentBoard.lists[2].should.have.property('name').and.equal('newlist');


  });

  it('should EDIT_BOARD', function() {

     const action = {
       type: 'EDIT_BOARD',
       payload: {
         name: "updatedBoard"
       }
     };
     store.dispatch(action);

     store.getState().should.have.property('currentBoard');
     store.getState().currentBoard.should.have.property('lists').and.be.an('array').of.length(3);
     store.getState().currentBoard.should.have.property('id');
     store.getState().currentBoard.should.have.property('name').and.equal('updatedBoard');

  });


  

  it('should MOVE_LIST', function() {
    const fromIndex = 0;
    const toIndex = 2;
    const previousIndexList = store.getState().currentBoard.lists[fromIndex];
     const action = {
       type: 'MOVE_LIST',
       payload: {
         fromIndex: fromIndex,
         toIndex: toIndex
       }
     };
     
     store.dispatch(action);

     store.getState().should.have.property('currentBoard');
     store.getState().currentBoard.should.have.property('lists').and.be.an('array').of.length(3);
     store.getState().currentBoard.lists[toIndex].should.have.property('id').and.equal(previousIndexList.id);

  });
  

  it('should MOVE_CARD', function() {
    const fromIndex = 0;
    const toIndex = 2;
    const previousIndexCard = store.getState().currentBoard.lists[2].cards[fromIndex];
    const action = {
      type: 'MOVE_CARD',
      payload: {
        fromIndex: fromIndex,
        toIndex: toIndex
      }
    };

    store.dispatch(action);

    store.getState().should.have.property('currentBoard');
    store.getState().currentBoard.lists[2].should.have.property('cards').and.be.an('array').of.length(3);
    store.getState().currentBoard.lists[2].cards[toIndex].should.have.property('id').and.equal(previousIndexCard.id);
  });
});