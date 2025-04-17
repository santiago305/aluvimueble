<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Views>
 */
class ViewFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array   
    {
        $deviceTypes =  ['mobile', 'tablet', 'desktop'];
        $browsers = ['Chrome', 'Firefox', 'Safari', 'Edge', 'Opera'];
        return [
            'ip' => $this->faker->ipv4(),
            'route' => $this->faker->url(),
            'viewed_at' => $this->faker->dateTimeBetween('-1 year', 'now'),
            'device_type' => $this->faker->randomElement($deviceTypes),
            'browser' => $this->faker->randomElement($browsers),
        ];
    }
}
