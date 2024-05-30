<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateStagesRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            "nome_de_etudiant" => "required|max:50",
            "nome_de_entreprise" => "required|max:50",
            "adress_de_entreprise" => "required|max:255",
            "encadrant_pedagogique" => "required|max:50",
            "phone" => "required|size:10",
            "encadrant" => "required|max:50",
            "institulé_de_sujet" => "required|max:50",
            "description" => "required|max:255",
            "technologie" => "required|max:50",
            "note" => "required"
        ];
    }
}
