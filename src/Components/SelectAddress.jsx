import React from 'react';

const SelectAddress = () => {
    return (
        <div>
            {/* <div>
              {addresses &&
                  !user.isAdmin &&
                  !user.isDriver &&
                  addresses.length > 0 && (
                      <>
                          <select
                              name='address'
                              defaultValue={addresses[0].id}
                              className='form-control'
                              onChange={(e) => setAddress(e.target.value)}>
                              {addresses.map((address, index) => (
                                  <option key={index} value={address.id}>
                                      {address.address}
                                  </option>
                              ))}
                          </select>
                      </>
                  )}
          </div> */}
        </div>
    );
};

export default SelectAddress;
