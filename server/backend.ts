import { GenezioDeploy } from "@genezio/types";

@GenezioDeploy()
export class BackendClass {
  async handleCall() {
    try {
      const response = await fetch("http://ip-api.com/json/103.112.170.0");
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  }

}