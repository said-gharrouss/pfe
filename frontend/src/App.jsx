import Index from "./router/Index";
import UserContext from "./context/UserContext"

function App() {

    return (
        <>
        <UserContext>
            <Index/>
        </UserContext>
        </>
    )
}

export default App
