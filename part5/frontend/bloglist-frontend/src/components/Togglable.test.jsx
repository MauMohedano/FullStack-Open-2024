/* eslint-disable no-undef */
import React from "react";
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import Togglable from "./Togglable";


describe('Details', () => {
    let component

    beforeEach(() => {
        component = render(
           <Togglable buttonLabel='show'>
            <div className="testDiv">TestDivContent</div>
           </Togglable>
        )
    }) 
    test('show details',() => {
        const el = component.getByText('TestDivContent')
        expect(el.parentNode).toHaveStyle('display: none')
    })
})