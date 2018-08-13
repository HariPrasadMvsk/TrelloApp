function TrelloApp(currState, action) {
  switch(action.type) {
    case 'ADD_CARD':
      const list = currState.currentBoard.lists.find(list => list.id === action.payload.listId);
      const index = currState.currentBoard.lists.indexOf(list);
      const newList = Object.assign({}, list, {
        cards: [...list.cards, { id: '' + Math.random()*8181, text: action.payload.text }]
      });
      return Object.assign({}, currState, {
        currentBoard: Object.assign({}, currState.currentBoard, {
          lists: [
            ...currState.currentBoard.lists.slice(0, index),
            newList,
            ...currState.currentBoard.lists.slice(index+1)
          ]
        })
      });

    case 'EDIT_BOARD':
      return Object.assign({}, currState, {
        currentBoard: Object.assign({}, currState.currentBoard, {
          id: currState.currentBoard.id,
          name: action.payload.name,
          lists: [
            ...currState.currentBoard.lists
          ]
        })
      });

    case 'CREATE_LIST':
        const newlist = {
              id: '' + Math.random() * 8181,
              name: action.payload.name,
              cards: []
            };
      
        return Object.assign({}, currState, {
          currentBoard: Object.assign({}, currState.currentBoard, {
            lists: [
              ...currState.currentBoard.lists, newlist
            ]
          })
        });
      
    case 'EDIT_CARD':
      const list1 = currState.currentBoard.lists.find(list => list.id === action.payload.listId);
      const index1 = currState.currentBoard.lists.indexOf(list1);
      const card1 = list1.cards.find(card => card.id === action.payload.cardId);
      const indexcard1 = list1.cards.indexOf(card1);
      const updateCard = { id : card1.id, text : action.payload.text };

      const newList1 = Object.assign({}, list1, {
        cards: [
          ...list1.cards.slice(0, indexcard1),
          updateCard,
          ...list1.cards.slice(indexcard1 + 1)
        ]
      });
      
      return Object.assign({}, currState, {
        currentBoard: Object.assign({}, currState.currentBoard, {
          lists: [
            ...currState.currentBoard.lists.slice(0, index1),
            newList1,
            ...currState.currentBoard.lists.slice(index1 + 1)
          ]
        })
      });
     

    case 'MOVE_LIST':
      const flist = currState.currentBoard.lists.find(list => list.id === action.payload.fromId);
      const flindex = currState.currentBoard.lists.indexOf(flist);
      const tlist = currState.currentBoard.lists.find(list => list.id === action.payload.toId);
      const tlindex = currState.currentBoard.lists.indexOf(tlist);
      const items = currState.currentBoard.lists[flindex];

      const afterRemoveList = Object.assign({}, currState.currentBoard, {
        lists: [
          ...currState.currentBoard.lists.slice(0, flindex),
          ...currState.currentBoard.lists.slice(flindex + 1)
        ]
      });

      return Object.assign({}, currState, {
        currentBoard: Object.assign({}, currState.currentBoard, {
              lists: [
                ...afterRemoveList.lists.slice(0, tlindex),
                items,
                ...afterRemoveList.lists.slice(tlindex)
              ]
          })
      });

    case 'EDIT_LIST':
      const list2 = currState.currentBoard.lists.find(list => list.id === action.payload.listId);
      const index2 = currState.currentBoard.lists.indexOf(list2);
      const updateList = {
        id: list2.id,
        name: action.payload.name,
        cards: list2.cards
      };

      return Object.assign({}, currState, {
        currentBoard: Object.assign({}, currState.currentBoard, {
          lists: [
            ...currState.currentBoard.lists.slice(0, index2),
            updateList,
            ...currState.currentBoard.lists.slice(index2 + 1)
          ]
        })
      });
      
    case 'MOVE_CARD':
    const list3 = currState.currentBoard.lists.find(list => list.id === action.payload.listId);
    const lindex = currState.currentBoard.lists.indexOf(list3);
    const fcard = currState.currentBoard.lists[lindex].cards.find(card => card.id === action.payload.fromIndex);
    const fcindex = currState.currentBoard.lists[lindex].cards.indexOf(fcard);
    const tcard = currState.currentBoard.lists[lindex].cards.find(card => card.id === action.payload.toIndex);
    const tcindex = currState.currentBoard.lists[lindex].cards.indexOf(tcard);
    const fromcard = currState.currentBoard.lists[lindex].cards[fcindex];

    const newList3 = Object.assign({}, list3, {
      cards: [ ...list3.cards.slice(0, fcindex),
      ...list3.cards.slice(fcindex+1)]
    })

    const newList4 = Object.assign({}, newList3, {
      cards: [
        ...newList3.cards.slice(0, tcindex),
        fromcard,
        ...newList3.cards.slice(tcindex)
      ]
    })

    return Object.assign({}, currState, {
      currentBoard: Object.assign({}, currState.currentBoard, {
        lists: [
          ...currState.currentBoard.lists.slice(0, lindex),
          newList4,
          ...currState.currentBoard.lists.slice(lindex + 1)
        ]
      })
    });

    default:
      return currState;
  }
}
module.exports = TrelloApp;
/*
  {
    currentBoard: {
      id: ,
      name: ,
      lists: [{
        id: ,
        name: ,
        text: 
      }]
    }
  }

  {
    type: 'ADD_CARD',
    payload: {
      listId: '',
      text: ''
    }
  }

  {
    type: 'CREATE_LIST',
    payload: {
      name: ''
    }
  }

  {
    type: 'EDIT_CARD',
    payload: {
      listId: ,
      cardId: ,
      newText: 
    }
  }

  {
    type: 'DELETE_CARD',
    payload: {
      listId: '',
      cardId: ''
    }
  }

  {
    type: 'DELETE_LIST',
    payload: {
      listId: ''
    }
  }

  {
    type: 'MOVE_CARD',
    payload: {
      fromListId: ,
      toListId: ,
      toListPosition: 
    }
  }

  {
    type: 'MOVE_LIST',
    payload: {
      fromPosition: '',
      toPosition: ''
    }
  }

  {
    type: 'EDIT_LIST',
    payload: {
      listId: '',
      newName:
    }
  }

  {
    type: 'EDIT_BOARD',
    payload: {
      newName:
    }
  }
*/

