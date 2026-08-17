import { createContext, useEffect, useState } from "react";

// import { food_list } from "../data";
import axios from "axios";

export const Storecontext=createContext(null)

function StorecontextProvider(props)
{

    const[cartitem,setcartitem]=useState({});

    const[token,settoken]=useState("");

    const[food_list,setfoodlist]=useState([])

    const addtocart=async (itemId)=>{

        if(!cartitem[itemId])
        {
            setcartitem((prev)=>({...prev,[itemId]:1}));
        }

        else
        {
            setcartitem((prev)=>({...prev,[itemId]:prev[itemId]+1}));
        }

        if(token)
        {
            await axios.post("http://localhost:4000/api/v1/grabfood/addcart",{itemId},{headers:{token}});
        }
    }

    const removecart= async(itemId)=>{

        setcartitem((prev)=>({...prev,[itemId]:prev[itemId]-1}));

        if(token)
        {
            await axios.post("http://localhost:4000/api/v1/grabfood/removecart",{itemId},{headers:{token}});
        }
    }

    const getcarttotalamount=()=>{

        // console.log('Cart items:', cartitem);
        // console.log('Food list:', food_list);

        let totalAmount=0;

        for(const item in cartitem)
        {
            if(cartitem[item]>0)
            {
                console.log("hi jii"+item);
               
                let product=food_list.find((buy)=>buy._id===/*Number*/(item));

                console.log("Uff"+product);
                
                if(product)
                {
                    totalAmount=totalAmount+(product.price*cartitem[item]);
                    console.log("hello"+totalAmount);
                }

            }
        }
        return totalAmount;
    }

    const fetchfoodlist=async()=>
    {
       try
       {
        const res=await axios.get("http://localhost:4000/api/v1/grabfood/list");

        setfoodlist(res.data.data);

        console.log(res.data.data);
       }

       catch(error)
       {
        console.log(error);
       }
    }

    const loadcartdata=async(token)=>
    {

        try
        {
             const res=await axios.post("http://localhost:4000/api/v1/grabfood/getcart",{},{headers:{token}});
             console.log("Hlo mai aagya hu",res.data.data);
             setcartitem(res.data.data);
        }

        catch(error)
        {
            console.error("❌ Error loading cart data:", error.response?.data || error.message);
        }

    }

    useEffect(()=>{

        console.log(cartitem);

    },[cartitem])

    useEffect(()=>
    {
        async function load_data() {

           await fetchfoodlist(); 

           if(localStorage.getItem("token"))
            {
                settoken(localStorage.getItem("token"));

                await loadcartdata(localStorage.getItem("token"));
            }
        }

        load_data();
    },[])


    const contextValue={
        food_list,
        cartitem,
        setcartitem,
        addtocart,
        removecart,
        getcarttotalamount,
        token,
        settoken,
    };

    return(
        <Storecontext.Provider value={contextValue}>
            {props.children}
        </Storecontext.Provider>
    )
}


export default StorecontextProvider;
