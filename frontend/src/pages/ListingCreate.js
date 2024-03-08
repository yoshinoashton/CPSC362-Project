import Layout from "../components/Layout";

export default function ListingCreate() {
  const login = true;
  if (!login) {
    // prompt user to login
  }

  return (
    <Layout>
      <div className="create-listing-page">
        <form className="create-listing-form">
          <label>
            Pal Name
            <input type="text" id="name"/>
          </label><br></br>
          <div className="create-listing-form-rarities">
          Rarity<br></br>
            <input type="radio" id="rarity-common" value="Common"/>
            <label for="rarity-common">Common</label><br></br>
            <input type="radio" id="rarity-uncommon" value="Uncommon"/>
            <label for="rarity-uncommon">Uncommon</label><br></br>
            <input type="radio" id="rarity-rare" value="Rare"/>
            <label for="rarity-rare">Rare</label><br></br>
            <input type="radio" id="rarity-epic" value="Epic"/>
            <label for="rarity-epic">Epic</label><br></br>
            <input type="radio" id="rarity-legendary" value="Legendary"/>
            <label for="rarity-legendary">Legendary</label><br></br>
          </div>
          <label>
            Image Link
            <input type="url"></input>
          </label><br></br>
          <label>
            <button type="submit" value="Create Listing">Create Listing</button>
            <button type="reset" value="Reset Form">Reset Form</button>
          </label>
        </form>
      </div>
    </Layout>
  );
}