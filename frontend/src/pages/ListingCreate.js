import Layout from "../components/Layout";

export default function ListingCreate() {
  const login = true;
  if (!login) {
    // prompt user to login
  }

  return (
    <Layout>
      <div className="create-listing-container page">
        <form className="create-listing-form">
          <input type="text" id="title"/>
        </form>
      </div>
    </Layout>
  );
}