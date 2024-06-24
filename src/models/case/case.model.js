import mongoose, { Schema, set } from "mongoose";

export const caseSchema = new Schema({
    chiefComplaint: {
        patientid: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Patient"
        },
        patientname: {
            type: String,
            required: true
        },
        patientfoundid: {
            type: String,
            required: true
        },
        StartDate: {
            type: String,
            set: a => a === '' ? undefined : a
        },
        Location: {
            type: String,
            set: b => b === '' ? undefined : b
        },
        Sensation: {
            type: String,
            set: c => c === '' ? undefined : c
        },
        Duration: {
            type: String,
            set: c => c === '' ? undefined : c
        },
        Modalities: {
            type: String,
            set: d => d === '' ? undefined : d
        },
        Agravation: {
            type: String,
            set: e => e === '' ? undefined : e
        },
        Amelioration: {
            type: String,
            set: f => f === '' ? undefined : f
        },
        OtherComplaints: {
            type: String,
            set: g => g === '' ? undefined : g
        },
    },
    generals: {
        complainId: {
            type: Schema.Types.ObjectId,
            ref: "Case"
        },
        thermal: {
            type: String,
            set: a => a === '' ? undefined : a
        },
        hungerTolerance: {
            type: String,
            set: b => b === '' ? undefined : b
        },
        eatingSpeed: {
            type: String,
            set: c => c === '' ? undefined : c
        },
        appetite: {
            type: String,
            set: d => d === '' ? undefined : d
        },
        perspiration: {
            type: String,
            set: e => e === '' ? undefined : e
        },
        badHabits: {
            type: String,
            set: f => f === '' ? undefined : f
        },
        thirst: {
            type: String,
            set: g => g === '' ? undefined : g
        },
        dream: {
            type: String,
            set: h => h === '' ? undefined : h
        },
        urine: {
            type: String,
            set: i => i === '' ? undefined : i
        },
        sleep: {
            type: String,
            set: j => j === '' ? undefined : j
        },
        sleepPosition: {
            type: String,
            set: k => k === '' ? undefined : k
        },
        foodDesires: {
            type: String,
            set: l => l === '' ? undefined : l
        },
        stool: {
            type: String,
            set: m => m === '' ? undefined : m
        },
        sensitivity: {
            type: String,
            set: n => n === '' ? undefined : n
        },
    },
    mind: {
        complainId: {
            type: Schema.Types.ObjectId,
            ref: "Case"
        },
        familyRelation: {
            type: String,
            set: a => a === "" ? undefined : a
        },
        friendsRelation: {
            type: String,
            set: b => b === "" ? undefined : b
        },
        gathering: {
            type: String,
            set: c => c === "" ? undefined : c
        },
        memory: {
            type: String,
            set: d => d === "" ? undefined : d
        },
        willPower: {
            type: String,
            set: e => e === "" ? undefined : e

        },
        personality: {
            type: String,
            set: f => f === "" ? undefined : f
        }
    },
    nature: {
        complainId: {
            type: Schema.Types.ObjectId,
            ref: "Case"
        },
        nature: {
            type: String,
            Option: ["Mild", "Angry", "weepingPosition", "Obstinate", "Manipulate", "Fastedious", "Fear", "other"],
            set: a => a === "" ? undefined : a

        },
        anxiety: {
            type: String,
            Option: ["health", "money", "family", "other"],
            set: b => b === "" ? undefined : b

        }
    },
    pastHistory: {
        complainId: {
            type: Schema.Types.ObjectId,
            ref: "Case"
        },
        patientHistory: {
            type: String,
            set: a => a === "" ? undefined : a

        },
        patientFamilyHistory: {
            type: String,
            set: b => b === "" ? undefined : b

        },
        patientDrugHistory: {
            type: String,
            set: c => c === "" ? undefined : c

        },
    },
    gyaneHistory: {
        complainId: {
            type: Schema.Types.ObjectId,
            ref: "Case"
        },
        menstrual: {
            type: String,
            set: a => a === "" ? undefined : a

        },
        Pain: {
            type: String,
            set: b => b === "" ? undefined : b
        },
        bleeding: {
            type: String,
            set: c => c === "" ? undefined : c
        },
        clotting: {
            type: String,
            set: d => d === "" ? undefined : d
        },
        leukorrhea: {
            type: String,
            set: e => e === "" ? undefined : e

        },
    },
    childhoodHistory: {
        complainId: {
            type: Schema.Types.ObjectId,
            ref: "Case"
        },
        Nature: {
            type: String,
            Option: ["talkative with guests", "less talkative with guests", "mild", "angry"],
            set: a => a === "" ? undefined : a

        }
    },
    behavoir: {
        complainId: {
            type: Schema.Types.ObjectId,
            ref: "Case"
        },
        Behavior: {
            type: String,
            options: ["Rudeness", "Lier Person", "Anger Level", "Other"],
            set: a => a === "" ? undefined : a

        },

    },

}, {
    timestamps: true
})

export const Case = mongoose.model("Case", caseSchema)