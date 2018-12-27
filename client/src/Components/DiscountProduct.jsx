import React from 'react';

  const DiscountProduct = (props) => {
    const numListPrice = Number(props.product.list_price.slice(1));
    const numPrice = Number(props.product.price.slice(1));
    console.log(numListPrice - numPrice);
    const savings = numListPrice - numPrice;
    savings = savings.toFixed(2);
    return (
      <div className='mk-price-div'>
        <table>
          <tbody>
            <tr>
              <td>
                List Price:
              </td>
              <td>
                <span className='mk-text-strike'>
                  {props.product.list_price}
                </span>
              </td>
            </tr>
            <tr>
              <td id='mk-price-block'>
                Price:
              </td>
              <td id='mk-discount-price'>
                {props.product.price}
              </td>
            </tr>
            <tr>
              <td>
                You Save: {savings}
              </td>
              <td>
                {props.product.discount}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  }

  export default DiscountProduct;