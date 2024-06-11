import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Card, CardBody, CardText } from "reactstrap";

interface Car {
  id: string;
  image: string;
  name: string;
  updated_at: string;
  price: number;
}

export default function HomeDashboard() {
  const [data, setData] = useState<Car[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userDataString = localStorage.getItem("user");
        const user = userDataString ? JSON.parse(userDataString) : null;

        if (!user.token) {
          throw new Error("No token found");
        }

        const response = await fetch("http://localhost:5000/api/v1/cars", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + user.token,
          },
        });

        const result = await response.json();

        setData(result.data);
        console.log(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID').format(price);
  }

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    };

    const date = new Date(dateString);
    return new Intl.DateTimeFormat('id-ID', options).format(date);
  }

  const styleActiveButton = {
    borderColor: "#0D28A6",
    borderWidth: "2px",
    color: "#0D28A6",
    backgroundColor: "#CFD4ED",
  };

  const styleUnactiveButton = {
    borderColor: "#0D28A6",
    borderWidth: "2px",
    color: "#0D28A6",
    backgroundColor: "#CFD4ED",
    opacity: "0.4",
  };

  return (
    <div className="container">
      <div className="d-flex gap-2 my-3" style={{ fontSize: "12px" }}>
        <p className="fw-semibold">Cars</p>
        <div>
          <i className="fa-solid fa-angle-right"></i>
        </div>
        <p style={{ fontWeight: "lighter" }}>List car</p>
      </div>
      <div className="d-flex justify-content-between">
        <div className="fw-bold fs-3 my-3">List Car</div>
        <Link to={"/dashboard/add-car"} className="text-decoration-none">
          <div
            className="btn d-flex fw-semibold text-white"
            style={{ backgroundColor: "#0D28A6" }}
          >
            <div className="me-3">
              <i className="fa-solid fa-plus"></i>
            </div>
            <p className="mb-0">Add New Car</p>
          </div>
        </Link>
      </div>
      <div className="d-flex gap-3 my-3">
        <button
          type="button"
          className="btn fw-semibold"
          style={styleActiveButton}
        >
          All
        </button>
        <button
          type="button"
          className="btn fw-semibold"
          style={styleUnactiveButton}
        >
          Small
        </button>
        <button
          type="button"
          className="btn fw-semibold"
          style={styleUnactiveButton}
        >
          Medium
        </button>
        <button
          type="button"
          className="btn fw-semibold"
          style={styleUnactiveButton}
        >
          Large
        </button>
      </div>
      <div className="row row-cols-3">
        {data.map((car) => (
          <div className="col" key={car.id}>
            <Card>
              <img
                className="m-4"
                alt="Card"
                src={car.image}
              />
              <CardBody>
                <CardText>
                  <p>{car.name}/Tipe Mobil</p>
                  <p className="fw-semibold">Rp {formatPrice(car.price)} / hari</p>
                  <div className="d-flex gap-2">
                    <div>
                      <i className="fa-solid fa-key"></i>
                    </div>
                    <p>Start rent - Finish rent</p>
                  </div>
                  <div className="d-flex gap-2">
                    <div>
                      <i className="fa-regular fa-clock"></i>
                    </div>
                    <p>Updated at {formatDate(car.updated_at)}</p>
                  </div>
                  <div className="d-flex justify-content-between">
                    <Link to={""}>
                      <Button color="danger" outline>
                        <div className="d-flex gap-2 my-1 mx-3 align-items-center">
                          <div>
                            <i className="fa-solid fa-trash"></i>
                          </div>
                          <div className="fw-semibold">Delete</div>
                        </div>
                      </Button>
                    </Link>
                    <Link to={""}>
                      <div className="btn p-0">
                        <div className="custom-btn-1 py-2 px-4">
                          <div className="d-flex gap-2 my-1 mx-3 align-items-center">
                            <div>
                              <i className="fa-regular fa-pen-to-square"></i>
                            </div>
                            <div className="fw-semibold">Edit</div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                </CardText>
              </CardBody>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}
