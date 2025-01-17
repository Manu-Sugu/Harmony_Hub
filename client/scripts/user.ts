"use strict";

namespace core {
    export class User {
        private _displayName: string;
        private _emailAddress: string;
        private _userName: string;
        private _password: string;

        constructor(displayName :string = "", emailAddress :string = "", userName :string = "", password :string = "") {
            this._displayName = displayName;
            this._emailAddress = emailAddress;
            this._userName = userName;
            this._password = password;
        }

        public get displayName():string {
            return this._displayName;
        }

        public set displayName(value : string) {
            this._displayName = value;
        }

        public get emailAddress() : string {
            return this._emailAddress;
        }

        public set emailAddress(value : string) {
            this._emailAddress = value;
        }

        public get userName() : string {
            return this._userName;
        }

        public set userName(value : string) {
            this._userName = value;
        }

        public get password():string {
            return this._password;
        }

        public set password(value:string) {
            this._password = value;
        }

        public toString() : string {
            return `displayName: ${this._displayName}\n
            emailAddress: ${this._emailAddress}\n
            userName: ${this._userName}`;
        }

        /**
         * Serialize for writing to localStorage.
         * @returns {null|string}
         */
        public serialize() : string|null {
            if (this._displayName !== "" && this._emailAddress !== "" && this._userName !== "") {
                return `${this.displayName},${this.emailAddress},${this.userName}`;
            }
            console.error("One or more properties of the Contact are empty or invalid");
            return null;
        }

        /**
         * Deserialize is used to read data from localStorage.
         * @param data
         */
        public deserialize(data:string) : void {
            let propertyArray = data.split(",");
            this._displayName = propertyArray[0];
            this._emailAddress = propertyArray[1];
            this._userName = propertyArray[2];
        }

        public toJSON() : {DisplayName:string; EmailAddress:string; Username:string}  {
            return {
                DisplayName: this._displayName,
                EmailAddress: this._emailAddress,
                Username: this._userName
            }
        }

        public fromJSON(data:User) : void {
            this._displayName = data.displayName;
            this._emailAddress = data.emailAddress;
            this._userName = data.userName;
            this._password = data.password;
        }
    }
}