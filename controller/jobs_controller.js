const url='https://www.themuse.com/api/public/jobs?category=Software%20Engineer&category=Software%20Engineering&page=2';

module.exports.jobs=async(req,res)=>{
    try {

        const response= await fetch(url);
        const data=await response.json();
        // console.log(data.results[0]);
        return res.render('jobs',{
            title:'Find jobs',
            data:data
        })
    } catch (error) {
        console.log('Error',error);
    }
}