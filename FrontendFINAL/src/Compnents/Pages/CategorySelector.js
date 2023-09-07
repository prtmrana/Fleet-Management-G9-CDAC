import React, { useState, useEffect } from 'react';
import '../../Style/VehicleSelection.css';
import { useNavigate } from 'react-router-dom';
import Navbar from '../PageNavigation';
import { Col, Row } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';

function CategorySelector() {
  const [CarCategory, setCategory] = useState([]);
  const [selectedCategoryName, setSelectedCategoryName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/car_category');
      const result = await response.json();
      setCategory(result);
    } catch (error) {
      console.error('Error fetching data:', error);
      // Handle error, you can navigate to an error page here
    }
  };

  const handleCategorySelect = (
    categoryId,
    dailyRates,
    weeklyRates,
    monthlyRates,
    categoryName
  ) => {
    sessionStorage.setItem('pickCategoryId', categoryId);
    sessionStorage.setItem('dailyRate', dailyRates);
    sessionStorage.setItem('weeklyRate', weeklyRates);
    sessionStorage.setItem('monthlyRate', monthlyRates);
    sessionStorage.setItem('pickcategoryName', categoryName);
    setSelectedCategoryName(categoryName); // Update the selected category name
  };

  const continueBookingHandler = () => {
    navigate('/addonpage');
  };

  const cancelHandler = () => {
    navigate('/');
  };

  return (
    <>
      <Navbar />
      <div className="vehicle-selection">
        <Row>
          {CarCategory.map((cat, index) => (
            <Col key={index} className="category-card">
              <Card border="info">
                <Card.Header>{cat.categoryName}</Card.Header>
                <Card.Img src={cat.imgPath} alt={cat.categoryName} />
                <Card.Body>
                  <Card.Text>
                    <p>Daily Rate: {cat.dailyRates}</p>
                    <p>Weekly Rate: {cat.weeklyRates}</p>
                    <p>Monthly Rate: {cat.monthlyRates}</p>
                  </Card.Text>
                  <button
                    className="select-button"
                    onClick={() =>
                      handleCategorySelect(
                        cat.categoryId,
                        cat.dailyRates,
                        cat.weeklyRates,
                        cat.monthlyRates,
                        cat.categoryName
                      )
                    }
                  >
                    Select
                  </button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
        <div className="selected-category">
          {selectedCategoryName && (
            <h1>Selected Category: {selectedCategoryName}</h1>
          )}
        </div>
        <div className="buttons">
          <button
            id="continue"
            onClick={continueBookingHandler}
          >
            Continue Booking
          </button>
          <button
            id="cancel"
            onClick={cancelHandler}
          >
            Cancel
          </button>
        </div>
      </div>
    </>
  );
}

export default CategorySelector;