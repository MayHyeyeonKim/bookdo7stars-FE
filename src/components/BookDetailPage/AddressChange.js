import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { SET_FULL_ADDRESS } from '../../constants/order.constants';
// eslint-disable-next-line import/no-named-as-default
import styled from 'styled-components';

// Styled component for the dropdown container
const DropdownContainer = styled.div`
  position: relative;
  z-index: 1501;
`;

const PostcodeWidget = styled.div`
  &.open {
    position: absolute;
    z-index: 1502;
    background: white;
  }
`;

const AddressChange = ({ setAddress }) => {
  const [isPostcodeOpen, setIsPostcodeOpen] = useState(false);
  const elementRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const script = document.createElement('script');
    script.src = '//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const togglePostcode = useCallback(() => {
    setIsPostcodeOpen((prev) => !prev);
  }, []);

  useEffect(() => {
    if (isPostcodeOpen && elementRef.current) {
      window.daum.postcode.load(() => {
        new window.daum.Postcode({
          oncomplete: (data) => {
            let fullAddress = data.address;
            const extraAddress = data.extraAddress ? ` (${data.extraAddress})` : '';
            if (data.userSelectedType === 'R') {
              fullAddress += extraAddress;
            }
            setAddress(fullAddress);
            dispatch({ type: SET_FULL_ADDRESS, fullAddress });
            togglePostcode();
          },
          width: '100%',
          height: '100%',
        }).embed(elementRef.current);
      });
    } else if (elementRef.current) {
      elementRef.current.innerHTML = '';
    }
  }, [isPostcodeOpen, setAddress, togglePostcode, dispatch]);

  return (
    <DropdownContainer>
      <div className="address-change-container">
        <button className="change-button" onClick={togglePostcode}>
          지역 선택 {'▾'}
        </button>
        <div style={{ color: 'red' }}>수도권과 부산은 하루배송 가능 지역입니다.</div>
      </div>
      <PostcodeWidget className={`postcode-widget ${isPostcodeOpen ? 'open' : ''}`} ref={elementRef}></PostcodeWidget>
    </DropdownContainer>
  );
};

export default AddressChange;
