import React,  { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

const ProductFilter = (props) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [isFiltersOpen, setIsFiltersOpen] = useState(false);

     //Handling checkboxes change
     const handleCheckbox = (event) => {
      const { name, checked , value} = event.target;
      const current = searchParams.get(name) ? searchParams.get(name).split(',') : [];

      // If the checkbox is checked and not already in the array, add it
      if (checked && !current.includes(value)) {
        current.push(value);
      }
    
      // If the checkbox is unchecked, remove it from the array
      if (!checked) {
        const index = current.indexOf(value);
        if (index > -1) {
          current.splice(index, 1);
        }
      }

      // Update the search parameters
      const newSearchParams = new URLSearchParams(searchParams);
      newSearchParams.set('page', '1');
      if (current.length > 0) {
        newSearchParams.set(name, current.join(',')); // Set categoried in the search parameters
      } else {
        newSearchParams.delete(name); //If there are no categories selected, remove the parameter from the search
      }
      
      setSearchParams(newSearchParams);
  };

    //Handle weight, price, country change
    const handleChange = (event) => {
        const { name, value } = event.target;
        const newSearchParams = new URLSearchParams(searchParams);
        newSearchParams.set('page', '1');
        newSearchParams.set(name, value);

      if(value === ''){
        newSearchParams.delete(name);
      }
       
        setSearchParams(newSearchParams);
    }

    //Handle Resete Filters
    const resetFilters = () => {
      setSearchParams('');

      // Reset checkboxes
      document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
        checkbox.checked = false;
      });

      // Reset radio buttons
      document.querySelectorAll('input[type="radio"]').forEach(radio => {
        radio.checked = false;
      });

      // Reset input fields
      document.getElementById('min').value = '';
      document.getElementById('max').value = '';

      // Reset select field
      document.getElementById('country').selectedIndex = 0;

    }

    //Toggle filters
    const toggleFilters = () => {
      setIsFiltersOpen(!isFiltersOpen);
    };

    return (
      <div className="flex flex-col lg:flex-row lg:flex-col">
          <button className="lg:hidden mt-4 px-4 py-2 bg-brightColor text-white rounded" onClick={toggleFilters}>
          {isFiltersOpen ? 'Hide Filters' : 'Show Filters'}
        </button>
        <aside className={`lg:block ${isFiltersOpen ? 'block' : 'hidden'} w-full bg-gray-50 p-6 rounded-lg`}>
         {/* <aside className="w-full bg-gray-50 p-6 rounded-lg lg:overflow-hidden overflow-visible lg:block lg:sticky relative top-0"> */}
            <div className="divide-y divide-gray-200">

              {/* Category Filter */}
              <div className="p-5">
                <h3 className="text-xl text-gray-800 mb-3 uppercase font-medium">Category</h3>
                <div className="space-y-2">

                  {props.categories.map((category, index) => (
                    <div key={index} className="flex items-center">
                      <input type="checkbox" name="category" value={category} id={category} className="text-primary focus:ring-0 rounded-sm cursor-pointer" onChange={handleCheckbox} />
                      <label htmlFor={category} className="text-gray-600 ml-3 cursor-pointer">{category}</label>
                    </div>
                  ))}
                </div>              
              </div>

              {/* Weight Filter */}
              <div className="p-5">
                <h3 className="text-xl text-gray-800 mb-3 uppercase font-medium">Weight</h3>
                <div className="flex items-center gap-2">
                  {props.weights.map((weight, index) => (
                    <div key={index} className="weight-selector">
                      <input type="radio" name="weight" id={weight} className="hidden" value={weight} onClick={handleChange} />
                      <label htmlFor={weight} className="radio-label text-xs border border-gray-200 rounded-sm h-9 w-9 flex items-center justify-center cursor-pointer shadow-sm text-gray-600">{weight}</label>
                    </div>
                    ))}
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
                  {props.grindTypes.map((grindType, index) => (
                    <div key={index} className="flex items-center">
                      <input type="checkbox" name="grind" id={grindType} className="text-primary focus:ring-0 rounded-sm cursor-pointer" value={grindType} onChange={handleCheckbox}/>
                      <label htmlFor={grindType} className="text-gray-600 ml-3 cursor-pointer">{grindType}</label>
                    </div>
                  ))}
                </div>              
              </div>
            </div>

            <div className="flex p-5 justify-center">
              <button onClick={resetFilters} className='px-10 py-3 border-2 border-white bg-gray-300 hover:bg-[#AB6B2E]  hover:text-white transition-all rounded-full'>Reset Filter</button>
            </div>

          </aside>
      </div>
    );
};

export default ProductFilter;