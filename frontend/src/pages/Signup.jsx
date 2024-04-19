import Form from "../components/Form"
export default function Signup() {
  return (
    <div>
      <Form route="/api/user/signup" method="signup" />
    </div>
  )
}
