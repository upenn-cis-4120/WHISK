import PropTypes from "prop-types";
import "./RecipeList.css";

function RecipeList({ recipes }) {
  return (
    <div className="recipe-list-section">
      {recipes.map((recipe) => (
        <div key={recipe.id} className="recipe-course">
          <div className="course-header">
            <h3>{recipe.courseName}</h3>
            <button className="change-course-button">
              <span className="icon">⟲</span>
              Change Course
            </button>
          </div>

          <div className="recipe-content">
            <div className="recipe-image">
              <img src={recipe.image} alt={recipe.courseName} />
            </div>
            <div className="recipe-items">
              <h4>Items</h4>
              <div className="items-list">
                {recipe.items.map((item, index) => (
                  <span 
                    key={index} 
                    className={`item-tag ${item.have ? 'have' : 'need'}`}
                  >
                    {item.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}

      <button className="add-course-button">
        <span className="plus-icon">+</span>
        Add additional course(s)
      </button>
    </div>
  );
}

RecipeList.propTypes = {
  recipes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      courseName: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      items: PropTypes.arrayOf(
        PropTypes.shape({
          name: PropTypes.string.isRequired,
          have: PropTypes.bool.isRequired
        })
      ).isRequired
    })
  ).isRequired
};

export default RecipeList; 