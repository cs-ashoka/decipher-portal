import Page from "./Page"

export default function Error() {
  return (
    <Page>
        <h1>404: Not Found</h1>
        <p>Sorry, the page you were looking for doesn't exist. <a href="/" style={{color: "white"}}>Go back</a></p>
    </Page>
  );
}