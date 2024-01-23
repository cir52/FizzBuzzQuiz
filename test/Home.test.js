import {fireEvent, render, screen, waitFor} from "@testing-library/react";
import Home, {EMPTY_RESULT_HINT} from "@pages/";

describe("<Home/>...", () => {

    //--------------------------------------
    //-  feel free to add more test cases  -
    //--------------------------------------

    describe("renders properly the...", () => {

        it("headline", () => {
            render(<Home/>);

            screen.getByRole("heading", {name: "FizzBuzz - Bewerber Quiz", level: 1});
        });

       // it.todo("input for target digit");
        it("renders the input for target digit", () => {
            render(<Home />);
            const input = screen.getByRole('spinbutton');
            expect(input).toBeInTheDocument();
        });

        // it.todo("submit button");
        it("renders the submit button", () => {
            render(<Home/>);
            const button = screen.getByRole('button', { name: /submit/i });
            expect(button).toBeInTheDocument();
        });

        // it.todo("hint text that a digit greater 0 has to be submitted");
        it("renders the hint text that a digit greater than 0 has to be submitted", () => {
            render(<Home/>);
            const hintText = screen.getByText(EMPTY_RESULT_HINT);
            expect(hintText).toBeInTheDocument();
        });

        describe("result when...", () => {

            it("only digits has to be rendered", async () => {
                render(<Home/>);

                submitFormWith(2);

                // hint should be disappeared
                expect(screen.queryByText(EMPTY_RESULT_HINT, {selector: ".result"})).toBeNull();

                screen.getByText(/^1$/, {selector: ".result li"});
                screen.getByText(/^2$/, {selector: ".result li"});
            });

            // it.todo("Fizz has to be rendered");
            it("renders 'Fizz' when a multiple of 3 is submitted", () => {
                render(<Home/>);
                submitFormWith(3);
                const resultItem = screen.getByText('Fizz', {selector: '.result li'});
                expect(resultItem).toBeInTheDocument();
            });

            // it.todo("Buzz has to be rendered");
            it("renders 'Buzz' when a multiple of 5 is submitted", () => {
                render(<Home/>);
                submitFormWith(5);
                const resultItem = screen.getByText('Buzz', {selector: '.result li'});
                expect(resultItem).toBeInTheDocument();
            });

            //it.todo("FizzBuzz has to be rendered");
            it("renders 'FizzBuzz' when a number that is a multiple of both 3 and 5 is submitted", () => {
                render(<Home/>);
                submitFormWith(15);
                const resultItem = screen.getByText('FizzBuzz', {selector: '.result li'});
                expect(resultItem).toBeInTheDocument();
            });

        });

        // it.todo("error message when a digit lower than 1 was submitted");
        it("renders an error message when a digit lower than 1 is submitted", () => {
            render(<Home/>);
            submitFormWith(0);
            const errorMessage = screen.getByText(/Der Wert sollte groesser 0 sein/i);
            expect(errorMessage).toBeInTheDocument();
        });

    });

    it("clears result list when input gains focus", async () => {
        render(<Home/>);
    
        submitFormWith(3);
        expect(screen.getByText('Fizz', {selector: '.result li'})).toBeInTheDocument();
    
        gainFocusOnInput();
    
        await waitFor(() => {
            expect(screen.queryByText('Fizz', {selector: '.result li'})).toBeNull();
            expect(screen.getByText(EMPTY_RESULT_HINT, {selector: '.result li'})).toBeInTheDocument();
        });
    });

    function submitFormWith(digit){
        fireEvent.change(screen.getByRole('spinbutton'), { target: { value: digit.toString() } });
        fireEvent.click(screen.getByRole('button'));
    }

    function gainFocusOnInput() {
        fireEvent.focus(screen.getByRole('spinbutton'));
    }
});