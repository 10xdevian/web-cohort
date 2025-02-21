// Polyfill for foreach
// foreach(current_index_value, current_index)
if(!Array.prototype.myforeach){
    Array.prototype.myforeach = function(callback){
        const temp = this;
        for(let i=0;i<temp.length;i++){
            callback(temp[i],i);
        }
    }
}

const arr2 = [1,2,3,4,5,6,7]
const result2 = arr2.myforeach((num,index)=>{
    console.log(`The index ${index} at present value is ${num}`)
})
console.log(result2)




// Polyfill for map 

// Array.map((current_index_element, current_index,array) => { })
    Array.prototype.mymap =  function(cb){
        const result = [];
        for(let i=0;i<this.length;i++){
            const value = cb(this[i],i);
            result.push(value);
            // result.push(cb(this[i],i,this))
        }
        return result;
    };
    // Examples 
    const num = [1,2,3,4]
    const multipleof2 = num.mymap((num)=>{
        return num*2;
    });
    console.log(multipleof2)
    const multipleof3 = num.mymap((num)=>{
        return num*3;
    });
    console.log(multipleof3);
    