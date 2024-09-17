import { listData } from "../../lib/dummydata";
import "./listPage.scss";
import Filter from "../../components/filter/Filter"
import Card from "../../components/card/Card"
import Map from "../../components/map/Map";
import { useLoaderData,Await } from "react-router-dom";
import { Suspense } from "react";

function ListPage() {
  const data = useLoaderData();
  console.log(data) ;
  return <div className="listPage">
    <div className="listContainer">
      <div className="wrapper">
        <Filter/>
        <Suspense fallback={<p>Loading...</p>}>
          <Await
            resolve={data.postResponse}
            errorElement={<p>Error loading posts!</p>}
          >
            {(postResponse) => {
                console.log('Resolved data:', postResponse);
                return postResponse.data && postResponse.data.length > 0 ? (
                  postResponse.data.map((post) => (
                    <Card key={post.id} item={post} />
                  ))
                ) : (
                  <p>No posts found</p>
                );
              }}
          </Await>
        </Suspense>
      </div>
    </div>
    {/* <div className="mapContainer">
      <Suspense fallback={<p>Loading...</p>}>
        <Await
          resolve={data.postResponse}
          errorElement={<p>Error loading posts!</p>}
        >
          {(postResponse) => <Map items={postResponse.data} />}
        </Await>
        </Suspense>
    </div> */}
  </div>;
}

export default ListPage;
