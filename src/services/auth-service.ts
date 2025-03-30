import { cookieUtils } from "@/app/utils/cookies.utils";
import { LoginFormType } from "@/lib/definitions/auth/login-form-definition";
import { getApiUrl } from "@/lib/utils";
import { IPerson } from "@/types/person-interface";

class AuthService {
  async logIn(values: LoginFormType) {
    const res = await fetch(
      `${getApiUrl()}/person?email=${values.email}&password=${values.password}`,
      {
        cache: "no-cache",
      }
    );
    const personList: IPerson[] = await res.json();
    if (personList.length === 0) {
      throw new Error("Invalid credentials");
    }

    const person = personList[0];
    person.password = "";
    this.createSession(person);
  }

  logOut() {
    cookieUtils.deleteCookie("session");
  }

  private createSession(person: IPerson) {
    cookieUtils.setCookie({
      name: "session",
      value: JSON.stringify(person),
      days: 1,
    });
  }
}

export const authService = new AuthService();
