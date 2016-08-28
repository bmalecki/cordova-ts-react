import {chai, enzyme, sinon} from "./helpers";
import * as React from "react";
import {Footer} from "../components/Footer";

const {assert, expect} = chai;
const {mount, shallow} = enzyme;


const Test = () => <div className="test"/>;

class Test2 extends React.Component<{}, {}> {
    render() {
        return <div/>;
    }
}


describe("Footer", () => {
  it("should be a function", () => {
    assert.isFunction(Footer);
  });
});

describe("test react with chai", () => {
  it("run exmaple code", () => {
    const wrapper = shallow(<Test />);
    expect(wrapper).to.be.not.null;
    expect(wrapper).to.be.checked;
    expect(wrapper).to.have.className("test");
    expect(wrapper).to.not.have.exactly(1).descendants(Test2);
  });  
});

describe("test chai sinon",() => {
  it("run example", () => {
    
    let user = {    
      setName: function(name){
        this.name = name;
      }
    }

    let setNameSpy = sinon.spy(user, "setName");

    user.setName("Darth Vader");
    setNameSpy.restore();
    expect(setNameSpy).to.have.been.calledWith("Darth Vader");
    
  });
});