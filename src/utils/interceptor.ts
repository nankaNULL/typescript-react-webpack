export function getResponse(response: any) {
  if(response.ok){
    return response;
  } else {
    throw response.status;
  }
}