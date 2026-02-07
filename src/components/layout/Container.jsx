export default function Container(props) {
  const { as = "div", className = "", ...rest } = props;

  const Comp = as;

  return <Comp className={`container-x ${className}`} {...rest} />;
}
