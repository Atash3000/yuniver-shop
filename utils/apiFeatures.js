class ApiFeatures{
  constructor(query,queryString){
     this.query=query;
     this.queryString= queryString
  }

  filter(){
     const queryObj = {...this.queryString}
    const exludeFileds = ['page','sort','limit','fields']
    exludeFileds.forEach(el=>delete queryObj[el])

    //ADVANCED FIltering
    let queryStr = JSON.stringify(queryObj)
      queryStr=queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match=>`$${match}`)
     this.query= this.query.find( JSON.parse(queryStr))
     return this;
  }

 //3 SORTING 
  sort(){
   
    if(this.queryString.sort){
      const sortBy = this.queryString.sort.split(',').join(' ')
      this.query=this.query.sort(sortBy)
    }else{
      this.query=this.query.sort('-createdAt')
    }
    return this;
  }


 // LIMIT FIELDSE
 
 //PAGINATION
  paginate(){
    
    const page = this.queryString.page *1 || 1;
    const limit =this.queryString.limit*1 || 100;
    const skip = (page-1) *limit;
     this.query = this.query.skip(skip).limit(limit)
  
  
    return this;
  }

  
}
module.exports =ApiFeatures;