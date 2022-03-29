export const epochToDateTime = (epochTime:number) => {
  var myDate = new Date(epochTime*1000);
  return myDate.toLocaleDateString();
}