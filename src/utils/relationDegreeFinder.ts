import { DbType } from "../types/db.type";

export const relationDegreeFinder = (db:DbType, searcherId:number,searchingId:number,degreeCount:number,escapeList:number[],searcherName:string,maxDegree:number = 5):string|undefined =>{
    // return if connection number is >= 5
    // console.log(searcherId,searchingId, escapeList);
    
    if (degreeCount >= maxDegree) {
        return "Not Found";
    }
    // search the searching id in the searcher's own relationship list
    const searcherRealationList = db.find(person => person.id === searcherId)?.relations;
    // look if the sercherid is in this own list
    const foundPerson = searcherRealationList?.find(person => person.id === searchingId);
    
    
    if (foundPerson) {
        // find searchrId name and searcheringId name and return
        const searchingPerson = db.find(person => person.id === searchingId);
        if (searchingPerson) {
            const searching = searchingPerson.name;
            return `${searcherName} > ${searching}`;
        }

    }else{
        // look for the list of next degree 
        if (searcherRealationList?.length) {
            for(let i=0; i<searcherRealationList?.length; i++){
                // console.log(escapeList,"escapeList");
                if (!escapeList.includes(searcherRealationList[i].id)) {
                    const nestedSearcher = db.find(person => person.id === searcherRealationList[i].id);
                    const nestedSearcherName = nestedSearcher?.name;
                    if (nestedSearcherName) {
                        // console.log(searcherRealationList[i].id,foundPerson);
                        const nestedFoundPerson = relationDegreeFinder(db,searcherRealationList[i].id,searchingId,degreeCount+1,[...escapeList,searcherRealationList[i].id],nestedSearcherName,maxDegree);
                        if (nestedFoundPerson) {
                            return searcherName + " > " + nestedFoundPerson;
                        }
                    }
                }
            }
        }
    }
}