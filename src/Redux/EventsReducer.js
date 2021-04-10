const GET_NEWS = 'GET_NEWS'
let initialState = {
    news: []
};

const EventsReducer = (state = initialState, action) => {
  switch (action.type) {
   case GET_NEWS :
       return{
           ...state,
           news:action.news
       }
    default:
      return state;
  }
};
export const getNews = (news) => (dispatch) =>{

}

export default EventsReducer;
