export const GET_SEARCH_MEDICINE_RESULTS = "GET_SEARCH_RESULTS";

// ---------------------------------SEARCH----------------------------------

export const fetchSearchMedicine = (token, query, searchType) => {
  return async (dispatch) => {
    try {
      const resp = await fetch("http://localhost:3001/medicines/search/" + searchType + "?q=" + query, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      if (resp.ok) {
        const data = await resp.json();
        dispatch({ type: GET_SEARCH_MEDICINE_RESULTS, payload: data });
      }
    } catch (err) {
      console.log(err);
    }
  };
};
