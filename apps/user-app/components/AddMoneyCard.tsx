"use client"
import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { Select } from "@repo/ui/Select";
import { useState } from "react";
import { TextInput } from "@repo/ui/TextInput";
import { createOnRampTransaction } from "../app/lib/actions/createOnRamptxn";

// Use : AddMoney()
// Need : A card component to add money to the wallet.





// Hardcoded list of supported banks
const SUPPORTED_BANKS = [{
    name: "HDFC Bank",
    redirectUrl: "https://netbanking.hdfcbank.com"
}, {
    name: "Axis Bank",
    redirectUrl: "https://www.axisbank.com/"
}];




export const AddMoney = () => {
    // State to store the redirect url , default set to hdfc bank
    const [redirectUrl, setRedirectUrl] = useState(SUPPORTED_BANKS[0]?.redirectUrl);
    const [amount , setAmount] = useState(0);

    // State to store the provider , default set to hdfc bank
    const [provider , setProvider] = useState(SUPPORTED_BANKS[0]?.name ||"");




    return (
    <Card title="Add Funds">
    <div className="w-full">

        
        {/* Input field to enter the amount */}
        <TextInput label={"Amount"} placeholder={"Amount"} onChange={(value) => {setAmount(Number(value));}} />
        <div className="py-4 text-left">Bank</div>


         {/* Dropdown to select the bank */}
        <Select 
            onSelect={(value) => {

                //it=>it.name === value , this is a function that is passed to find method. 
                //this function is called for each element in the array. 
                //returns true if the name of the bank in the array == to the value passed to the onSelect function
                // then the find method returns the first element that satisfies the condition.
                // Ex : SUPPORTED_BANKS[0] = {name : "HDFC Bank" , redirectUrl : "https://netbanking.hdfcbank.com"}
  
                setRedirectUrl(SUPPORTED_BANKS.find(it => it.name === value)?.redirectUrl || "");
                setProvider(SUPPORTED_BANKS.find(it => it.name === value)?.name|| "");
            }} 
            options={SUPPORTED_BANKS.map(it => ({
                key: it.name,
                value: it.name
            }))} />


        {/* Button to add money */}
        <div className="flex justify-center pt-4">
            <Button onClick={async () => {
                // current url = window.location.href
                // Setting new url to redirectUrl
                window.location.href = redirectUrl || "";

                // Creating a transaction log
                await createOnRampTransaction(amount, provider);
            }}>
            Add Money
            </Button>
        </div>
    </div>
</Card>
)
}