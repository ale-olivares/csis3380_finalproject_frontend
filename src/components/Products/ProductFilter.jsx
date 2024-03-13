import React from 'react';
import { useSearchParams } from 'react-router-dom';

const ProductFilter = (props) => {
    const [searchParams, setSearchParams] = useSearchParams();

    //Handle category change
    const handleCategoryChange = (event) => {
        const { name, checked } = event.target;
        const currentCategories = searchParams.get('category') ? searchParams.get('category').split(',') : [];

        // If the checkbox is checked and not already in the array, add it
        if (checked && !currentCategories.includes(name)) {
          currentCategories.push(name);
        }
      
        // If the checkbox is unchecked, remove it from the array
        if (!checked) {
          const index = currentCategories.indexOf(name);
          if (index > -1) {
            currentCategories.splice(index, 1); // Remove the category
          }
        }

        // Update the search parameters
        const newSearchParams = new URLSearchParams(searchParams);
        if (currentCategories.length > 0) {
          newSearchParams.set('category', currentCategories.join(',')); // Join the categories array into a string and set it in the search parameters
        } else {
          newSearchParams.delete('category'); // If there are no categories selected, remove the parameter from the search
        }
      
        setSearchParams(newSearchParams);
    };

    //Handle weight, price, country change
    const handleChange = (event) => {
        const { name, value } = event.target;
        const newSearchParams = new URLSearchParams(searchParams);
        newSearchParams.set(name, value);
        setSearchParams(newSearchParams);
    }

    //Handle grind change
    const handleGrindChange = (event) => {
        const {  value, checked } = event.target;
        const currentGrinds = searchParams.get('grind') ? searchParams.get('grind').split(',') : [];

        if(checked && !currentGrinds.includes(value)){
            currentGrinds.push(value);
        }

        if(!checked){
            const index = currentGrinds.indexOf(value);
            if (index > -1) { 
                currentGrinds.splice(index, 1); // Remove the grind
            }
        }

        const newSearchParams = new URLSearchParams(searchParams);
        if (currentGrinds.length>0){
            newSearchParams.set('grind', currentGrinds.join(','));
        }else{
            newSearchParams.delete('grind');
        }

        setSearchParams(newSearchParams);
    };


    return (
        <div className="w-1/4 pt-[85px] bg-gray-50" >
          <aside className="w-full p-6 bg-white rounded-lg overflow-hidden hidden lg:block bg-gray-50 sticky top-[85px]">
            <div className="divide-y divide-gray-200">

              {/* Category Filter */}
              <div className="p-5">
                <h3 className="text-xl text-gray-800 mb-3 uppercase font-medium">Category</h3>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input type="checkbox" name="Coffee" id="Coffee" className="text-primary focus:ring-0 rounded-sm cursor-pointer" onChange={handleCategoryChange}  />
                    <label htmlFor="coffee" className="text-gray-600 ml-3 cursor-pointer">Coffee</label>
                    {/* <div className="ml-auto text-gray-600 text-sm">(15)</div> */}
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" name="Tea" id="Tea" className="text-primary focus:ring-0 rounded-sm cursor-pointer" onChange={handleCategoryChange} />
                    <label htmlFor="tea" className="text-gray-600 ml-3 cursor-pointer">Tea</label>
                    {/* <div className="ml-auto text-gray-600 text-sm">(15)</div> */}
                  </div>
                </div>              
              </div>

              {/* Weight Filter */}
              <div className="p-5">
                <h3 className="text-xl text-gray-800 mb-3 uppercase font-medium">Weight</h3>
                <div className="flex items-center gap-2">
                    <div className="weight-selector">
                        <input type="radio" name="weight" id="250g" className="hidden" value="250g" onClick={handleChange} />
                        <label htmlFor="250g" className="radio-label text-xs border border-gray-200 rounded-sm h-9 w-9 flex items-center justify-center cursor-pointer shadow-sm text-gray-600"> 250g </label>
                    </div>
                    <div className="weight-selector">
                        <input type="radio" name="weight" id="500g" className="hidden" value="500g" onClick={handleChange}/>
                        <label htmlFor="500g" className="radio-label text-xs border border-gray-200 rounded-sm h-9 w-9 flex items-center justify-center cursor-pointer shadow-sm text-gray-600">500g</label>
                    </div>
                </div>         
              </div>

            {/* Price Filter */}
            <div className="p-5">
                <h3 className="text-xl text-gray-800 mb-3 uppercase font-medium">Price</h3>
                <div className="flex items-center">
                    <input type="number" name="min" id="min" className="w-full border-gray-300 focus:border-primary rounded-l focus:ring-0 px-3 py-1 text-gray-600 shadow-sm m-2" placeholder="Min" onChange={handleChange}/>
                    <span className="text-gray-500">-</span>
                    <input type="number" name="max" id="max" className="w-full border-gray-300 focus:border-primary rounded-r focus:ring-0 px-3 py-1 text-gray-600 shadow-sm m-2" placeholder="Max" onChange={handleChange}/>
                </div>
            </div>

            {/* Country Filter */}
            <div className="p-5">
                <h3 className="text-xl text-gray-800 mb-3 uppercase font-medium">Country</h3>
                <select name="country" id="country" className="w-full border-gray-300 focus:border-primary rounded focus:ring-0 px-3 py-2 text-gray-600 shadow-sm" onChange={handleChange}>
                <option value="">Select Country</option>
                    {props.countries.map((country, index) => (
                        <option key={index} value={country}>{country}</option>
                    ))}      
                </select>
            </div>

             {/* Grind Types Filter */}
             <div className="p-5">
                <h3 className="text-xl text-gray-800 mb-3 uppercase font-medium">Grind Type</h3>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input type="checkbox" name="grind" id="ground" className="text-primary focus:ring-0 rounded-sm cursor-pointer" value="Ground" onChange={handleGrindChange}/>
                    <label htmlFor="ground" className="text-gray-600 ml-3 cursor-pointer">Ground</label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" name="grind" id="wholebean" className="text-primary focus:ring-0 rounded-sm cursor-pointer" value="Whole Bean"  onChange={handleGrindChange}/>
                    <label htmlFor="wholebean" className="text-gray-600 ml-3 cursor-pointer"> Whole Bean</label>
                  </div>
                </div>              
              </div>
            </div>

          </aside>
        </div>
    );
};

export default ProductFilter;