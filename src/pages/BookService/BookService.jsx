import { useContext } from "react";
import { useLoaderData } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";

const BookService = () => {
    const service = useLoaderData();
    const { title, _id, price, img } = service;
    const {user} = useContext(AuthContext)
    const  handleBookService = event =>{
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const date = form.date.value;
        const email = user?.email;
        const booking = {
            customerName:name,
            email,
            image: img,
            date,
            service: title,
            service_id: _id,
            price: price

        }

        console.log(booking);

        fetch('http://localhost:5000/bookings', {
            method: 'POST',
            headers:{
                'content-type': 'application/json'
            },
            body: JSON.stringify(booking)

        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            if(data.insertedId){
                alert('Service booked successfully')
            }
        })
    }
    return (
        <div>
            <h2 className=" text-center text-3xl">Book Services: {title} </h2>

            <form onSubmit={handleBookService} className="card-body">
                <div className=" grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">User Name</span>
                        </label>
                        <input type="text" placeholder="Your Name" name="name" defaultValue={user?.name} className="input input-bordered" required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Date</span>
                        </label>
                        <input type="date" name="date" className="input input-bordered" required />
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Your Email</span>
                        </label>
                        <input type="email" placeholder="Your Email" defaultValue={user?.email} name="email" className="input input-bordered" required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Due Amount</span>
                        </label>
                        <input type="text" defaultValue={'$ '+ price} className="input input-bordered" required />
                    </div>
                </div>


                <div className="form-control mt-6">
                    <input className="btn btn-block bg-[#FF3811] text-white" type="submit" value="Order Confirm" />
                </div>
            </form>
        </div>
    );
};

export default BookService;