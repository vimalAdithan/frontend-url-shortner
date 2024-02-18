import { useState, useEffect } from "react";

export function Home() {
  const [items, setItems] = useState(null);

  useEffect(() => {
    fetch("https://backend-url-shortner-kappa.vercel.app/urls")
      .then((data) => data.json())
      .then((crd) => setItems(crd));
  }, []);
  return items ? <List items={items} /> : <h1>Loading...</h1>;
}
function List({ items }) {
  const [url, setUrl] = useState("");
  const addUrl = () => {
    const newCard = {
      fullurl: url,
    };
    fetch("https://backend-url-shortner-kappa.vercel.app/add", {
      method: "POST",
      body: JSON.stringify(newCard),
      headers: { "Content-Type": "application/json" },
    });
  };
  const callurl = (url) => {
    window.open(url, "_blank");
    window.focus();
    location.reload();
  };
  return (
    <div className="container home">
      <h1
        style={{
          color: "rgba(67, 124, 34, 0.918)",
          fontFamily: "'Bebas Neue', cursive",
        }}
        className="text-center"
      >
        url shortner
      </h1>
      <form
        style={{ display: "flex" }}
        className="col my-4 form-inline"
        onSubmit={() => addUrl()}
      >
        <input
          required
          type="string"
          placeholder="url"
          className="form-control mr-2"
          onChange={(event) => setUrl(event.target.value)}
        />
        <button type="submit" className="btn btn-success">
          shorten
        </button>
      </form>
      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>full url</th>
              <th>short url</th>
              <th>clicks</th>
            </tr>
          </thead>
          <tbody>
            {items.map((e) => (
              <tr key={e._id}>
                <td>
                  <a href={e.fullurl}>{e.fullurl}</a>
                </td>
                <td>
                  <a
                    onClick={() =>
                      callurl(
                        `https://backend-url-shortner-kappa.vercel.app/VK/${e.shorturl}`
                      )
                    }
                    href="/home"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {e.shorturl}
                  </a>
                </td>
                <td>{e.clicks}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
