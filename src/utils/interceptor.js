export function getResponse(response) {
  if(response.ok){
    return response;
  } else {
    throw response.status;
  }
}