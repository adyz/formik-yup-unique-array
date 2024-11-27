import React from "react";
import { Formik, Form, Field, FieldArray } from "formik";
import * as Yup from "yup";
import "./yupHelpers";

const schema = Yup.object().shape({
  friends: Yup.array()
    .of(
      Yup.object().shape({
        name: Yup.string().min(4, "too short").required("Required"), // these constraints take precedence
        salary: Yup.string().min(3, "cmon").required("Required"), // these constraints take precedence
      })
    )
    .required("Must have friends") // these constraints are shown if and only if inner constraints are satisfied
    .min(3, "Minimum of 3 friends")
    .unique("name"),
});

export const Form1 = () => (
  <div>
    <h1>Friend List</h1>
    <Formik
      initialValues={{ friends: ["jared", "ian", "brent"] }}
      onSubmit={(values) =>
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
        }, 500)
      }
      validationSchema={schema}
      render={({ values, isValid, errors }) => (
        <Form>
          <FieldArray
            name="friends"
            render={(arrayHelpers) => (
              <div>
                {values.friends && values.friends.length > 0 ? (
                  values.friends.map((friend, index) => (
                    <div key={index}>
                      <div>
                        <div>
                          <Field name={`friends.${index}.name`} />
                          {errors &&
                            errors.friends &&
                            errors.friends[index] && (
                              <p>{errors.friends[index].name}</p>
                            )}
                        </div>
                        <div>
                          <Field name={`friends.${index}.salary`} />
                          {errors &&
                            errors.friends &&
                            errors.friends[index] && (
                              <p>{errors.friends[index].salary}</p>
                            )}
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => arrayHelpers.remove(index)} // remove a friend from the list
                      >
                        -
                      </button>
                      <button
                        type="button"
                        onClick={() => arrayHelpers.insert(index, "")} // insert an empty string at a position
                      >
                        +
                      </button>
                    </div>
                  ))
                ) : (
                  <button type="button" onClick={() => arrayHelpers.push("")}>
                    {/* show this when user has removed all friends from the list */}
                    Add a friend
                  </button>
                )}
                <div>
                  {isValid ? (
                    "Valid"
                  ) : (
                    <pre>{JSON.stringify(errors, null, 2)}</pre>
                  )}
                  <button type="submit">Submit</button>
                </div>
              </div>
            )}
          />
        </Form>
      )}
    />
  </div>
);
