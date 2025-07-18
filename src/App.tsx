import React from "react";

import Address from "@/components/Address/Address";
import AddressBook from "@/components/AddressBook/AddressBook";
import Button from "@/components/Button/Button";
import InputText from "@/components/InputText/InputText";
import Radio from "@/components/Radio/Radio";
import Section from "@/components/Section/Section";
import Form from "@/components/Form/Form";
import ErrorMessage from "@/components/ErrorMessage/ErrorMessage";
import useAddressBook from "@/hooks/useAddressBook";
import useForm from "@/hooks/useForm";

import styles from "./App.module.css";
import { Address as AddressType } from "./types";
import transformAddress, { RawAddressModel } from "./core/models/address";
import fetchAddress from "./utils/fetchAddress";

function App() {
  /**
   * Form fields states
   */
  const { formState, handleChange, resetForm } = useForm();
  const { postCode, houseNumber, firstName, lastName, selectedAddress } = formState;

  /**
   * Results states
   */
  const [error, setError] = React.useState<undefined | string>(undefined);
  const [addresses, setAddresses] = React.useState<AddressType[]>([]);

  /**
   * Redux actions
   */
  const { addAddress } = useAddressBook();

  /** TODO: Fetch addresses based on houseNumber and postCode using the local BE api
   * - Bonus: Add a loading state in the UI while fetching addresses
   */
  const handleAddressSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    setAddresses([]);
    setError("");

    const { response: res, error: err } = await fetchAddress({ postcode: postCode, streetnumber: houseNumber });
    if (err) {
      setError(err);
      return;
    }

    const transformed = res.details.map((add: RawAddressModel) => transformAddress({
      ...add,
      firstName
    }));

    setAddresses(transformed);
  };

  const handlePersonSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!firstName || !lastName) {
      setError("First name and last name fields are mandatory!");
      return;
    }

    if (!selectedAddress || !addresses.length) {
      setError(
        "No address selected, try to select an address or find one if you haven't"
      );
      return;
    }

    const foundAddress = addresses.find(
      (address) => address.id === selectedAddress
    );

    if (!foundAddress) {
      setError("Selected address not found");
      return;
    }

    addAddress({ ...foundAddress, firstName, lastName });
  };

  const clearForm = () => {
    // Clear form inputs
    resetForm();

    // Clear addresses and error message
    setError("")
    setAddresses([]);
  };

  return (
    <main>
      <Section>
        <h1>
          Create your own address book!
          <br />
          <small>
            Enter an address by postcode add personal info and done! 👏
          </small>
        </h1>
        <Form
          label="🏠 Find an address"
          onFormSubmit={handleAddressSubmit}
          formEntries={[
            {
              name: "postCode",
              placeholder: "Post Code",
              value: postCode,
              onChange: handleChange,
            },
            {
              name: "houseNumber",
              placeholder: "House Number",
              value: houseNumber,
              onChange: handleChange,
            }
          ]}
          submitText="Find"
          loading={false}
        />
        {addresses.length > 0 &&
          addresses.map((address) => {
            return (
              <Radio
                name="selectedAddress"
                id={address.id}
                key={address.id}
                onChange={handleChange}
              >
                <Address {...address} />
              </Radio>
            );
          })}
        {selectedAddress && (
          <form onSubmit={handlePersonSubmit}>
            <fieldset>
              <legend>✏️ Add personal info to address</legend>
              <div className={styles.formRow}>
                <InputText
                  name="firstName"
                  placeholder="First name"
                  onChange={handleChange}
                  value={firstName}
                />
              </div>
              <div className={styles.formRow}>
                <InputText
                  name="lastName"
                  placeholder="Last name"
                  onChange={handleChange}
                  value={lastName}
                />
              </div>
              <Button type="submit">Add to addressbook</Button>
            </fieldset>
          </form>
        )}

        {error && <ErrorMessage>{error}</ErrorMessage>}

        <Button variant="secondary" onClick={clearForm}>Clear</Button>
      </Section>

      <Section variant="dark">
        <AddressBook />
      </Section>
    </main>
  );
}

export default App;
