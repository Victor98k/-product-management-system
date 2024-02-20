import mongoose, { connect } from "mongoose";
import prompt from "prompt-sync";

const main = async () => {
  try {
    await connect("mongodb://127.0.0.1:27017/product-management-system");

    const { db } = mongoose.connection;

    const productCol = await db.collection("");
    const catergoryCol = await db.collection("");

    const categorySchema = mongoose.Schema({
      categoryName: String,
      catergoryType: String,
    });

    const productSchema = mongoose.Schema({
      categoryName: String,
      catergoryType: String,
    });

    const catergoryModel = mongoose.model("Categorys", categorySchema);

    const p = prompt();

    // Start Menu

    console.log("--------------Main Menu---------------");
    console.log("1. Add new category");
    console.log("2. Add new product");
    console.log("3. View products by category");
    console.log("4. View products by supplier");
    console.log("5. View all offers within a price range");
    console.log(
      "6. View all offers that contain a product from a specific category"
    );
    //
    console.log(
      "7. View the number of offers based on the number of its products in stock"
    );
    console.log("8. Create order for products");
    console.log("9. Create order for offers");
    console.log("10. Ship orders");
    console.log("11. Add a new supplier");
    console.log("12. View suppliers");
    console.log("13.  View all sales");
    console.log("14.  View sum of all profits");
  } catch (error) {
    console.log(("Error fetching data:", error));
  }

  let runApp = true;

  const p = prompt();

  while (runApp) {
    let prompt = p("Make a choice by entering number: ");
    switch (prompt) {
      case "1":
        console.clear();
        // Our method to find and display all of our movies from the database.
        let movies = await movieModel.find({});
        console.clear();

        console.log(movies);
        console.log("Above is the list of all current movies in the database.");
        console.log("----------Menu----------");
        console.log("1. Show all movies.");
        console.log("2. Add new movie");
        console.log(
          "3. Update a movie (Update title, director or release date)"
        );
        console.log("4. Delete a movie.");
        console.log("5. Exit");
        console.log("-------------------------");

        break;

      case "2":
        console.clear();
          console.log("Add new product");
          async function addNewProduct() {
            let Namee = p("Enter name of product");
            let Category = p("Enter Category");
            let Price = p("Enter Price");
            let Cost = p("Enter Cost");
            let Stock = p("Enter Stock");
          };
          let newProduct = {
            Namee,
            Category,
            Price,
            Cost,
            Stock
          };
          await productModel.create(newProduct);
          console.log("You have added a new product");
          console.log(newProduct);

        break;

      case "3":
        console.clear();
        console.log("You have chosen to update a movie.");
        await updateMovie();

        console.log("----------Menu----------");
        console.log("1. Show all movies.");
        console.log("2. Add new movie");
        console.log(
          "3. Update a movie (Update title, director or release date)"
        );
        console.log("4. Delete a movie.");
        console.log("5. Exit");
        console.log("-------------------------");
        break;

      case "4":
        console.clear();
        console.log("You have choosen to delete a movie");
        await deleteMovie();

        break;
      case "5":
        runApp = false;
        break;
      default:
        console.log("Please enter a number between 1-5");
    }
  }

  // Update movie
  async function updateMovie() {
    let movieTitle = p("Enter the title of the movie you want to update: ");
    let movieToUpdate = await movieModel.findOne({ title: movieTitle });

    let newTitle = "";
    let newDirector = "";
    let newReleaseYear = "";
    let newGenres = [];
    let newRatings = [];
    let newCast = [];

    if (movieToUpdate) {
      console.log("--------------------------------------");
      console.log("What would you like to update?");
      console.log("1. Title");
      console.log("2. Director");
      console.log("3. Release Year ");
      console.log("4. Genres");
      console.log("5. Ratings");
      console.log("6. Cast");
      console.log("7. Update all");
      console.log("8. Go back to the main menu");
      console.log("--------------------------------------");

      let updateChoice = p("Make a choice by entering number: ");

      switch (updateChoice) {
        case "1":
          newTitle = p("Enter new title: ");
          movieToUpdate.title = newTitle;
          break;
        case "2":
          newDirector = p("Enter new director: ");
          movieToUpdate.director = newDirector;
          break;
        case "3":
          newReleaseYear = p("Enter new release year: ");

          movieToUpdate.releaseYear = newReleaseYear;
          break;
        case "4":
          let genreAction = p(
            "Would you like to add or remove a genre? (add/remove): "
          );
          let genreName = p("Enter the genre name: ");
          if (genreAction === "add") {
            movieToUpdate.genres.push(genreName);
          } else if (genreAction === "remove") {
            movieToUpdate.genres = movieToUpdate.genres.filter(
              (genre) => genre !== genreName
            );
          }
          break;
        case "5":
          let ratingAction = p(
            "Would you like to add or remove a rating? (add/remove): "
          );
          let ratingValue = p("Enter the rating value: ");
          if (ratingAction === "add") {
            movieToUpdate.ratings.push(ratingValue);
          } else if (ratingAction === "remove") {
            movieToUpdate.ratings = movieToUpdate.ratings.filter(
              (rating) => rating !== ratingValue
            );
          }
          break;
        case "6":
          let castAction = p(
            "Would you like to add or remove a cast member? (add/remove): "
          );
          let castName = p("Enter the cast member name: ");
          if (castAction === "add") {
            movieToUpdate.cast.push(castName);
          } else if (castAction === "remove") {
            movieToUpdate.cast = movieToUpdate.cast.filter(
              (cast) => cast !== castName
            );
          }
          break;
        case "7":
          newTitle = p("Enter new title: ");
          newDirector = p("Enter new director: ");
          newReleaseYear = p("Enter new release year: ");
          newGenres = p("Enter new genres: ");
          newRatings = p("Enter new ratings: ");
          newCast = p("Enter new cast: ");

          movieToUpdate.title = newTitle;
          movieToUpdate.director = newDirector;
          movieToUpdate.releaseYear = newReleaseYear;
          movieToUpdate.genres = newGenres;
          movieToUpdate.ratings = newRatings;
          movieToUpdate.cast = newCast;
          break;

        default:
          console.log("Invalid choice. Please try again.");
          break;
      }

      await movieToUpdate.save();
      console.clear();
      console.log("Movie updated successfully!");
    } else {
      console.log("Movie not found. Please try again.");
    }
  }
};
main();

// Function to delete one movie from the  collection.
async function deleteMovie() {
  let movieToDelete = p(
    "Please enter the title of the movie you want to delete: "
  );

  const deleteMovie = await movieModel.findOne({ title: movieToDelete });

  if (!movieToDelete) {
    console.log("No movie found with the provided title.");
    return;
  }

  await movieModel.deleteOne({ _id: deleteMovie._id });
  console.log("You have deleted the movie: " + movieToDelete);
  console.log("----------Menu----------");
  console.log("1. Show all movies.");
  console.log("2. Add new movie");
  console.log("3. Update a movie (Update title, director or release date)");
  console.log("4. Delete a movie.");
  console.log("5. Exit");
  console.log("-------------------------");
}

// Update movie
async function updateMovie() {
  let movieTitle = p("Enter the title of the movie you want to update: ");
  let movieToUpdate = await movieModel.findOne({ title: movieTitle });

  let newTitle = "";
  let newDirector = "";
  let newReleaseYear = "";
  let newGenres = [];
  let newRatings = [];
  let newCast = [];

  if (movieToUpdate) {
    console.log("--------------------------------------");
    console.log("What would you like to update?");
    console.log("1. Title");
    console.log("2. Director");
    console.log("3. Release Year ");
    console.log("4. Genres");
    console.log("5. Ratings");
    console.log("6. Cast");
    console.log("7. Update all");
    console.log("8. Go back to the main menu");
    console.log("--------------------------------------");

    let updateChoice = p("Make a choice by entering number: ");

    switch (updateChoice) {
      case "1":
        newTitle = p("Enter new title: ");
        movieToUpdate.title = newTitle;
        break;
      case "2":
        newDirector = p("Enter new director: ");
        movieToUpdate.director = newDirector;
        break;
      case "3":
        newReleaseYear = p("Enter new release year: ");

        movieToUpdate.releaseYear = newReleaseYear;
        break;
      case "4":
        let genreAction = p(
          "Would you like to add or remove a genre? (add/remove): "
        );
        let genreName = p("Enter the genre name: ");
        if (genreAction === "add") {
          movieToUpdate.genres.push(genreName);
        } else if (genreAction === "remove") {
          movieToUpdate.genres = movieToUpdate.genres.filter(
            (genre) => genre !== genreName
          );
        }
        break;
      case "5":
        let ratingAction = p(
          "Would you like to add or remove a rating? (add/remove): "
        );
        let ratingValue = p("Enter the rating value: ");
        if (ratingAction === "add") {
          movieToUpdate.ratings.push(ratingValue);
        } else if (ratingAction === "remove") {
          movieToUpdate.ratings = movieToUpdate.ratings.filter(
            (rating) => rating !== ratingValue
          );
        }
        break;
      case "6":
        let castAction = p(
          "Would you like to add or remove a cast member? (add/remove): "
        );
        let castName = p("Enter the cast member name: ");
        if (castAction === "add") {
          movieToUpdate.cast.push(castName);
        } else if (castAction === "remove") {
          movieToUpdate.cast = movieToUpdate.cast.filter(
            (cast) => cast !== castName
          );
        }
        break;
      case "7":
        newTitle = p("Enter new title: ");
        newDirector = p("Enter new director: ");
        newReleaseYear = p("Enter new release year: ");
        newGenres = p("Enter new genres: ");
        newRatings = p("Enter new ratings: ");
        newCast = p("Enter new cast: ");

        movieToUpdate.title = newTitle;
        movieToUpdate.director = newDirector;
        movieToUpdate.releaseYear = newReleaseYear;
        movieToUpdate.genres = newGenres;
        movieToUpdate.ratings = newRatings;
        movieToUpdate.cast = newCast;
        break;

      default:
        console.log("Invalid choice. Please try again.");
        break;
    }

    await movieToUpdate.save();
    console.clear();
    console.log("Movie updated successfully!");
  } else {
    console.log("Movie not found. Please try again.");
  }
}
